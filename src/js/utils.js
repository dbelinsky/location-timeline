// eslint-disable-next-line import/prefer-default-export
export function parseCoordinates(input) {
    const regex = /^\[?([-+]?[0-9]*\.?[0-9]+),\s*([-+]?[0-9]*\.?[0-9]+)\]?$/;
    const match = input.match(regex);
    if (!match) {
      throw new Error('Invalid format');
    }
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
    };
  }