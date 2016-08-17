window.onload = () => {
    let api = 'https://api.github.com';
    let url = api + '/users/wybiral/repos?sort=pushed';
    fetch(url).then(response => {
        return response.json();
    }).then(results => {
        let repos = document.querySelector('#repos');
        for (let x of results) {
            if (!x.description) {
                continue;
            }
            let li = document.createElement('li');
            let h2 = document.createElement('h2');
            let a = document.createElement('a');
            a.setAttribute('href', x.html_url);
            let name = x.name;
            let start = x.created_at.slice(0, 4);
            name += ' (' + start;
            let updated = x.pushed_at.slice(0, 4);
            if (start !== updated) {
                name += '-' + updated;
            }
            name += ')';
            a.appendChild(document.createTextNode(name));
            h2.appendChild(a);
            li.appendChild(h2);
            let div = document.createElement('div');
            div.appendChild(document.createTextNode(x.description));
            li.appendChild(div);
            repos.appendChild(li);
        }
    });
};