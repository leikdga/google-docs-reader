const editViewPattern = /^https:\/\/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([^\/]+)\/(edit|view)(.*)/;
const previewPattern = /^https:\/\/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([^\/]+)\/(preview)(.*)/;

chrome.action.onClicked.addListener((tab) => {
    if (typeof tab.url !== "string") return;

    const previewMatch = tab.url.match(previewPattern);
    if (previewMatch) {
        const docType = previewMatch[1];
        const docId = previewMatch[2];
        const tail = previewMatch[4] || "";
        const editViewUrl = `https://docs.google.com/${docType}/d/${docId}/edit${tail}`;
        chrome.tabs.update(tab.id, { url: editViewUrl });
        return;
    }

    const editViewMatch = tab.url.match(editViewPattern);
    if (editViewMatch) {
        const docType = editViewMatch[1];
        const docId = editViewMatch[2];
        const tail = editViewMatch[4] || "";
        const previewUrl = `https://docs.google.com/${docType}/d/${docId}/preview${tail}`;
        chrome.tabs.update(tab.id, { url: previewUrl });
    }
});
