import { createClient } from '@supabase/supabase-js'

// Kong is the single public entrypoint of the stack: it fronts Auth
// (/auth/v1), PostgREST (/rest/v1) and Studio on one port.
const SUPABASE_URL = process.env.SUPABASE_URL ?? 'http://localhost:5000'

// ANON_KEY from your .env - this is the public demo key from
// .env.upstream-example, safe to publish, useless outside your machine.
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// 1. Sign up a user. GoTrue autoconfirms emails by default in this stack
//    (ENABLE_EMAIL_AUTOCONFIRM=true), so we get a session straight back -
//    no mail server needed.
const email = `demo-${Date.now()}@example.com`
const password = 'super-secret-password'

const { data: signUp, error: signUpError } = await supabase.auth.signUp({
  email,
  password,
})
if (signUpError) throw signUpError
console.log(`Signed up ${signUp.user.email} (id ${signUp.user.id})`)

// 2. Insert rows through the auto-generated REST API. Row Level Security
//    fills user_id from the JWT (default auth.uid()) and guarantees the
//    user only ever sees their own rows.
const { error: insertError } = await supabase.from('todos').insert([
  { task: 'Self-host Supabase on a 2 GiB box', done: false },
  { task: 'Write the blog post', done: true },
])
if (insertError) throw insertError

// 3. Read them back.
const { data: todos, error: selectError } = await supabase
  .from('todos')
  .select('id, task, done')
  .order('id')
if (selectError) throw selectError

console.log('My todos:')
for (const t of todos) console.log(`  [${t.done ? 'x' : ' '}] #${t.id} ${t.task}`)

// 4. Prove RLS works: a fresh anonymous client (no session) sees nothing.
const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const { data: leaked } = await anonClient.from('todos').select('*')
console.log(`Rows visible without a session: ${leaked.length}`)
