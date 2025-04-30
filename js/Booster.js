class Booster extends Engine {
    constructor(
        name,
        image,
        trustAtmo,
        trustVacu,
        ispAtmo,
        ispVacu,
        weight,
        size,
        fuel
    ) {
        super(name,image,trustAtmo,trustVacu,ispAtmo,ispVacu,weight,size,fuel);
    }

    getTrustForEnvironment(environment, celestialBody) {
        let temp = "trust"+environment;
        return this[temp]-this.weight*celestialBody.surfaceGravity;
    }
}