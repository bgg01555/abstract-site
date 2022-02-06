class Site {

    constructor(name) {
        this.name = name;
        this.boards = [];
    }

    addBoard(board) {
        if ([...this.boards.map(x => x.name)].includes(board.name)) throw new boardDupNameError();
        board.attached = true;
        this.boards.push(board);
        return true;
    }

    findBoardByName(name) {
        return this.boards.find((x) => x.name === name)
    }
}

class Board {
    static article_id_idx = 0;
    constructor(name) {
        if (name === '') throw new emptyStringError();
        if (name === null) throw new nullStringError();
        this.name = name;
        this.attached = false;
        this.articles = [];
    }

    publish(article) {
        if (this.attached === false) throw new boardNotAttachedError();
        article.id.id_name = `${this.name}-${Board.article_id_idx}`;
        article.createdDate = new Date().toISOString();
        article.attached = true;
        Board.article_id_idx++;

        this.articles.push(article);
    }

    getAllArticles() {
        return this.articles;
    }
}

class Article {
    constructor(article) {
        if (article.subject === '') throw new emptyStringError();
        if (article.subject === null) throw new nullStringError();
        if (article.content === '') throw new emptyStringError();
        if (article.content === null) throw new nullStringError();
        if (article.author === '') throw new emptyStringError();
        if (article.author === null) throw new nullStringError();


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
        this.attached = false;
        this.comments = [];
    }

    reply(comment) {
        if (!this.attached) throw new articleNotAttachedError();
        comment.createdDate = new Date().toISOString();
        this.comments.push(comment);

    }

    getAllComments() {
        return this.comments;
    }


}

class Comment {
    constructor(comment) {
        if (comment.content === '') throw new emptyStringError();
        if (comment.content === null) throw new nullStringError();
        if (comment.author === '') throw new emptyStringError();
        if (comment.content === null) throw new nullStringError();
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
