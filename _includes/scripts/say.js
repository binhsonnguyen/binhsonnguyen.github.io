function fortune() {
    "use strict";

    const fortunes = [
        "thế giới cần thêm nhiều nhà lãnh đạo học tập tử tế",
        "rasing the bar",
        "không những phần mềm chạy ổn, mà còn phải tinh xảo",
        "không những phản hồi với thay đổi, mà còn phải kiên định có thêm giá trị",
        "không những phản hồi với thay đổi, mà còn phải kiên định có thêm giá trị",
        "không những cá nhân và sự tương tác, mà còn phải cộng đồng chuyên nghiệp",
        "không những cộng tác với khách hàng, mà còn phải đối tác bền chặt",
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
