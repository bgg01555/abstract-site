class Site {

    constructor(name) {
        this.name = name;
        this.boards = [];
    }

    addBoard(board) {
        for (const obj of this.boards) {
            if (obj.name == board.name) {
                throw new boardDupNameError();
            }
        }
        board.enable = true;
        this.boards.push(board);

        return true;
    }

    findBoardByName(name) {
        for (const obj of this.boards) {
            if (obj.name == name) return obj;
        }
    }
}

class Board {
    static article_id_idx = 0;
    constructor(name) {
        if (name == '') throw new emptyStringError();
        if (name == null) throw new nullStringError();
        this.name = name;
        this.enable = false;
        this.articles = [];
    }

    publish(article) {
        if (this.enable == false) throw new boardNotEnableError();
        article.id.id_name = `${this.name}-${Board.article_id_idx}`;
        article.createdDate = new Date().toISOString();
        article.enable = true;
        Board.article_id_idx++;

        this.articles.push(article);
    }

    getAllArticles() {
        return this.articles;
    }
}

class Article {
    constructor(article) {
        if (article.subject == '') throw new emptyStringError();
        if (article.subject == null) throw new nullStringError();
        if (article.content == '') throw new emptyStringError();
        if (article.content == null) throw new nullStringError();
        if (article.author == '') throw new emptyStringError();
        if (article.author == null) throw new nullStringError();


        this.subject = article.subject;
        this.content = article.content;
        this.author = article.author;
        this.id = {
            id_name: '',
            startsWith(val) {
                if (this.id_name.split('-')[0] + '-' == val) return true;
                return false;
            }
        };
        this.date = '';
        this.enable = false;
        this.comments = [];
    }

    reply(comment) {
        if (!this.enable) throw new articleNotEnableError();
        comment.createdDate = new Date().toISOString();
        this.comments.push(comment);

    }

    getAllComments() {
        return this.comments;
    }


}

class Comment {
    constructor(comment) {
        if (comment.content == '') throw new emptyStringError();
        if (comment.content == null) throw new nullStringError();
        if (comment.author == '') throw new emptyStringError();
        if (comment.content == null) throw new nullStringError();
        this.content = comment.content;
        this.author = comment.author;
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
