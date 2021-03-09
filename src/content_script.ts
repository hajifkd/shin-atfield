const SEM_ELEMS = ["div", "section", "article", "nav", "header", "footer", "aside", "main"]
const FLAT_ELEMS = ["a", "p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "s", "small", "strong", "del", "q"]
const WORD_LIST = ["シンエヴァ", "シン・エヴァ"]

function process(words: string[]) {
    [...document.querySelectorAll<HTMLElement>(SEM_ELEMS.join(","))].filter(e =>
        [...e.childNodes].filter(n => n.nodeType == Node.TEXT_NODE || FLAT_ELEMS.includes(n.nodeName.toLowerCase()))
            .some(n => words.some(word => (n.textContent?.indexOf(word) ?? -1) >= 0))
    ).forEach(e => e.style.filter = 'opacity(0%)')
}

function main() {
    process(WORD_LIST)
    const observer = new MutationObserver(() => process(WORD_LIST))
    observer.observe(document.documentElement, { subtree: true, characterData: true, childList: true })
}

main()