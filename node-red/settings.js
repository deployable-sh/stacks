module.exports = {
    uiPort: process.env.PORT || 1880,
    flowFile: "flows.json",
    flowFilePretty: true,
    adminAuth: {
        type: "credentials",
        users: [
            {
                username: "__USERNAME__",
                password: "__PASSWORD_HASH__",
                permissions: "*",
            },
        ],
    },
    logging: {
        console: { level: "info", metrics: false, audit: false },
    },
    editorTheme: {
        projects: { enabled: false },
    },
};
