/**
 * Variable que contiene la configuracion de colores default la cual podra 
 * ser cambiada por colores definidos por el usuario
 */

const colorDefault = {
    mainColor: '#D62B5B',
    secondColor: '#269FAC',
    textColor: '#090305',
    background: '#f4f4f4',
    backgroundButton: '#f7f7f7',
}

/**
 * Variable que contiene la configuracion de colores del modo dark
 */

const colorDarkMode = {
    mainColor: '#b7234d',
    secondColor: '#1c7680',
    textColor: '#e0e0e0',
    background: '#2b2b2b',
    backgroundButton: '#333333'
}

/**
 * Funcion que setea los colores al widget.
 * 
 *  -> Se aplican unicamente si el cliente los envia
 *  -> Si el cliente no los envia se aplica los estilos que están en style.css :root
 * 
 * @param {*} colors 
 */
export const setColors = (colors = {}, isDarkMode) => {
    if (colors) {
        if (colors.mainColor) {
            if (!isDarkMode)
                colorDefault.mainColor = colors.mainColor;
            document.documentElement.style.setProperty('--main-color', colors.mainColor);
        }
        if (colors.secondColor) {
            if (!isDarkMode)
                colorDefault.secondColor = colors.secondColor;
            document.documentElement.style.setProperty('--second-color', colors.secondColor);
        }
        if (colors.textColor) {
            if (!isDarkMode)
                colorDefault.textColor = colors.textColor;
            document.documentElement.style.setProperty('--text-color', colors.textColor);
        }
        if (colors.background) {
            if (!isDarkMode)
                colorDefault.background = colors.background;
            document.documentElement.style.setProperty('--background', colors.background);
        }
        if (colors.backgroundButton) {
            if (!isDarkMode)
                colorDefault.backgroundButton = colors.backgroundButton;
            document.documentElement.style.setProperty('--background-button', colors.backgroundButton);
        }
    }
}

/**
 * Funcion que activa o desactiva el modo dark
 * 
 * @param {*} isActive 
 */
export const setColorsDarkMode = (isActive) => {
    if (isActive) {
        document.documentElement.classList.add("dark-theme");
        setColors(colorDarkMode, isActive);
    } else {
        setColors(colorDefault);
        document.documentElement.classList.toggle("dark-theme");
    }
}