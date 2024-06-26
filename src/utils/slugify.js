const slug = require("slug")

function slugify(text) {
    const timestamp = Date.now();
    const newText = slug(text, {lower: true})

    return `${newText}-${timestamp};`
};


function slugifyUpdate(newText, oldSlug) {
    const sluggedText = slug(newText, {lower: true});
    const oldParts = oldSlug.split("-");
    const lastPart = oldParts[oldParts.length - 1];
    const updateText = sluggedText + "-" + lastPart;;
    return updateText;

}

module.exports = {
    slugify,
    slugifyUpdate
}
    