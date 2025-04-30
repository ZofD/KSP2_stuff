class RocketStore {
    constructor() {
        this._rockets = new Map();
    }

    addRocket(rocket) {
        if (rocket instanceof Rocket && !this.hasRocket(rocket.name)) {
            this._rockets.set(rocket.name, rocket);
        } else {
            throw new Error("Obiekt musi być instancją Rocket i nazwa nie może się powtóżyć");
        }
    }

    getRocket(rocketName) {
        return this._rockets.get(rocketName) || null;
    }

    removeRocket(rocketName) {
        return this._rockets.delete(rocketName);
    }

    hasRocket(rocketName) {
        return this._rockets.has(rocketName);
    }

    getAllRockets() {
        return Array.from(this._rockets.values());
    }
}