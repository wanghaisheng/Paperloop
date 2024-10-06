export const name = "data-particles";

export const getParticles = <T extends unknown>(element: Element | Document = document): T => {
    const particles = element.getElementsByClassName(name).item(0)?.getAttribute(name);
    return particles && JSON.parse(particles);
};
