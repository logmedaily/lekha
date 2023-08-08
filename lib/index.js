const LekhaTypes = {
    Info: 'info',
    Debug: 'debug',
    Warning: 'warning',
    Success: 'success',
    Error: 'error',
    Critical: 'critical',
};

class Lekha {
    constructor(appName, version) {
        this.enabled = true;
        this.enabledTypes = new Set([
            LekhaTypes.Info,
            LekhaTypes.Debug,
            LekhaTypes.Warning,
            LekhaTypes.Success,
            LekhaTypes.Error,
            LekhaTypes.Critical,
        ]);
        this.appName = appName;
        this.version = version;
    }

    log(type, code, action, message) {
        if (!this.enabled || !this.enabledTypes.has(type)) {
            return;
        }

        let logColor;
        let logLabel;

        switch (type) {
            case LekhaTypes.Info:
                logColor = '\x1b[34m';
                logLabel = '[INFO]';
                break;
            case LekhaTypes.Debug:
                logColor = '\x1b[33m';
                logLabel = '[DEBUG]';
                break;
            case LekhaTypes.Warning:
                logColor = '\x1b[35m';
                logLabel = '[WARNING]';
                break;
            case LekhaTypes.Success:
                logColor = '\x1b[32m';
                logLabel = '[SUCCESS]';
                break;
            case LekhaTypes.Critical:
                logColor = '\x1b[41m';
                logLabel = '[CRITICAL]';
                break;
            case LekhaTypes.Error:
                logColor = '\x1b[31m';
                logLabel = '[ERROR]';
                break;
            default:
                throw new Error(`Unknown log type: ${type}`);
        }

        const timestamp = new Date().toISOString();
        const logMessage = `${logColor}${logLabel} [${timestamp}] ${this.appName} v${this.version} (${code}) ${action}: ${message}\x1b[0m`;
        console.log(logMessage);
    }
    
    initialize(appName, version) {
        this.appName = appName;
        this.version = version;
        this.success(0, 'Lekha initialized', 'Lekha initialized successfully.');
    }

    info(code, action, message) {
        this.log(LekhaTypes.Info, code, action, message);
    }

    debug(code, action, message) {
        this.log(LekhaTypes.Debug, code, action, message);
    }

    warning(code, action, message) {
        this.log(LekhaTypes.Warning, code, action, message);
    }

    success(code, action, message) {
        this.log(LekhaTypes.Success, code, action, message);
    }

    error(code, action, message) {
        this.log(LekhaTypes.Error, code, action, message);
    }

    critical(code, action, message) {
        this.log(LekhaTypes.Critical, code, action, message);
    }

    customLog(type, code, action, message) {
        if (!Object.values(LekhaTypes).includes(type)) {
            throw new Error(`Unknown log type: ${type}`);
        }
        this.log(type, code, action, message);
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    enableType(type) {
        if (!this.enabledTypes.has(type)) {
            this.enabledTypes.add(type);
        }
    }

    disableType(type) {
        this.enabledTypes.delete(type);
    }
}

module.exports = { Lekha, LekhaTypes };
