class EnvironmentStore {
    constructor() {
        this._environments = new Map();
        this.loadEnvironmentsFromMock();
    }

    addEnvironment(environment) {
        if (environment instanceof Environment && !this.hasEnvironment(environment.name)) {
            this._environments.set(environment.name, environment);
        } else {
            throw new Error("Obiekt musi być instancją Environment");
        }
    }

    getEnvironment(environmentName) {
        return this._environments.get(environmentName) || null;
    }

    removeEnvironment(environmentName) {
        return this._environments.delete(environmentName);
    }

    hasEnvironment(environmentName) {
        return this._environments.has(environmentName);
    }

    getAllEnvironments() {
        return Array.from(this._environments.values());
    }
    
    loadEnvironmentsFromMock() {
        environmentMock.forEach(element => {
            this.addEnvironment(Environment.fromObject(element));
        });
    }
}