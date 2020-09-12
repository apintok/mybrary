const rootStyles = window.getComputedStyle(document.documentElement);

if (rootStyles.getPropertyValue('--book-cover-width-large') != null &&
    rootStyles.getPropertyValue('--book-cover-width-large') !== '') {
    ready();
    console.log('here1')
} else {

    document.getElementById('main-css').addEventListener('load', ready);
    console.log('here2')
}

function ready() {
    const coverWidth = parseFloat(rootStyles.getPropertyPriority('--book-cover-width-large'));
    const coverRatio = parseFloat(rootStyles.getPropertyPriority('--book-cover-aspect-ratio'));
    const coverHeight = coverWidth / coverRatio;

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    )

    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeight
    });

    FilePond.parse(document.body);
}