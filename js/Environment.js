class Environment {
    constructor(
        name,
        environment
    ) {
        this.name = name;
        this.environment = environment;
    }

    static fromObject(environment) {
        return new Environment(
            environment.name,
            environment.environment, 
        );
    }

    checkEnvironment(environment) {
        return environment in this.environment;
    }

    getEnvironmentBox() {
        let output = '';
        Object.entries(this.environment).forEach(([key, value]) => {
            output += '<div class="form-check environment">';
            output += '<input class="form-check-input" type="radio" name="environment" id="'+key+'">';
            output += '<label class="form-check-label" for="'+key+'">'+value+'</label>';
            output += '</div>';
        });
        return output;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (typeof name !== "string" && name !== "") {
            throw new Error("name musi być miepustym ciągiem znaków");
        }
        this._name = name;
    }

    get environment() {
        return this._environment;
    }

    set environment(environment) {
        if (typeof environment !== "object") {
            throw new Error("environment musi być obiektem");
        }
        this._environment = environment;
    }
}