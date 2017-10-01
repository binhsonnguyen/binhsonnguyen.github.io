function fortune() {
    "use strict";

    const fortunes = [
        "thế giới cần thêm nhiều nhà lãnh đạo học tập tử tế"
    ];

    return randomPick(fortunes);

    function randomPick(list) {
        return list[Math.floor((Math.random() * list.length))];
    }

}

function cowsay(fortune) {
    "use strict";

    return wrap(fortune, 40);

    function wrap(text, width, breaker, cut) {
        if (!text) {
            return text;
        }

        const E = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');

        breaker = breaker || '\n';
        width = width || 75;
        cut = cut || false;
        return text.match(RegExp(E, 'g')).join(breaker);

    }
}
