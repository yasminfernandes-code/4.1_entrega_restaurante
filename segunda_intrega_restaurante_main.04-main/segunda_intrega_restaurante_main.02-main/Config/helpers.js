// Config/helpers.js
import Handlebars from 'handlebars';

export const registerHelpers = (handlebarsInstance = Handlebars) => {
    if (!handlebarsInstance || !handlebarsInstance.registerHelper) {
        console.error("❌ Erro: instância do Handlebars inválida!");
        return;
    }

    // Helper: igualdade
    handlebarsInstance.registerHelper('if_eq', function (a, b, options) {
        return (a === b) ? options.fn(this) : options.inverse(this);
    });

    // Helper: diferença
    handlebarsInstance.registerHelper('if_not_eq', function (a, b, options) {
        return (a !== b) ? options.fn(this) : options.inverse(this);
    });

    console.log("✅ Handlebars Helpers registrados com sucesso!");
};
