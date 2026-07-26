export const extractSprite = (data: any) =>
  data.sprites.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
  data.sprites.front_default ||
  data.sprites.other?.["official-artwork"]?.front_default

export const extractShinySprite = (data: any) =>
  data.sprites.versions?.["generation-v"]?.["black-white"]?.animated?.front_shiny ||
  data.sprites.front_shiny ||
  data.sprites.other?.["official-artwork"]?.front_shiny