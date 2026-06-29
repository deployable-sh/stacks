#!/bin/sh
# Bootstrap a MySQL Group Replication group (the engine behind InnoDB
# Cluster) across three nodes. Idempotent: if the group already has an
# ONLINE member, it exits without touching anything.
set -e

PASS="$MYSQL_ROOT_PASSWORD"
RPL_PASS="$MYSQL_REPLICATION_PASSWORD"
NODES="mysql-gr-1 mysql-gr-2 mysql-gr-3"

q() { mysql -h "$1" -uroot -p"$PASS" --connect-timeout=5 -N -e "$2"; }

echo "waiting for all nodes..."
for n in $NODES; do
  until mysqladmin -h "$n" -uroot -p"$PASS" ping --silent 2>/dev/null; do
    echo "  $n not ready"; sleep 3
  done
done

ONLINE=$(q mysql-gr-1 "SELECT COUNT(*) FROM performance_schema.replication_group_members WHERE MEMBER_STATE='ONLINE';" 2>/dev/null || echo 0)
if [ "${ONLINE:-0}" -ge 1 ]; then
  echo "group already running (${ONLINE} online) - nothing to do"; exit 0
fi

echo "configuring recovery user on every node..."
for n in $NODES; do
  mysql -h "$n" -uroot -p"$PASS" <<SQL
SET SQL_LOG_BIN=0;
CREATE USER IF NOT EXISTS 'rpl_user'@'%' IDENTIFIED BY '$RPL_PASS';
GRANT REPLICATION SLAVE, BACKUP_ADMIN, GROUP_REPLICATION_STREAM ON *.* TO 'rpl_user'@'%';
FLUSH PRIVILEGES;
SET SQL_LOG_BIN=1;
-- Clear any GTIDs generated during this node's own initialization so the
-- group starts from a clean, identical state (otherwise joiners with extra
-- local transactions are rejected).
RESET BINARY LOGS AND GTIDS;
CHANGE REPLICATION SOURCE TO SOURCE_USER='rpl_user', SOURCE_PASSWORD='$RPL_PASS' FOR CHANNEL 'group_replication_recovery';
SQL
done

echo "bootstrapping the group on mysql-gr-1..."
mysql -h mysql-gr-1 -uroot -p"$PASS" <<SQL
SET GLOBAL group_replication_bootstrap_group=ON;
START GROUP_REPLICATION;
SET GLOBAL group_replication_bootstrap_group=OFF;
SQL

echo "joining mysql-gr-2 and mysql-gr-3..."
for n in mysql-gr-2 mysql-gr-3; do
  mysql -h "$n" -uroot -p"$PASS" -e "START GROUP_REPLICATION;"
done

echo "done. group members:"
q mysql-gr-1 "SELECT MEMBER_HOST, MEMBER_STATE, MEMBER_ROLE FROM performance_schema.replication_group_members;"
