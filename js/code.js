const htmlEscape = str => {
    return ([
        str,
        [/&/g, '&amp;'],
        [/>/g, '&gt;'],
        [/</g, '&lt;'],
        [/"/g, '&quot;'],
        [/'/g, '&#39;'],
        [/`/g, '&#96;']
    ]).reduce((x, y) => x.replace(y[0], y[1]));
};

const getProjects = user => {
    const api = 'https://api.github.com';
    const url = api + '/users/' + user + '/repos';
    const params = '?sort=created';
    return fetch(url + params).then(response => {
        return response.json();
    }).then(results => {
        const out = [];
        for (let x of results) {
            if (!x.description || x.fork) {
                continue;
            }
            out.push(x);
        }
        return out;
    });
};

const getDate = project => {
    const created = project.created_at.slice(0, 4);
    const pushed = project.pushed_at.slice(0, 4);
    if (created === pushed) {
        return created;
    } else {
        return created + '-' + pushed;
    }
};

window.onload = () => {
    let repos = document.querySelector('#projects');
    getProjects('wybiral').then(projects => {
        projects.forEach(project => {
            const url = htmlEscape(project.html_url);
            const name = htmlEscape(project.name);
            const date = htmlEscape(getDate(project));
            const description = htmlEscape(project.description);
            repos.innerHTML += `
                <li>
                    <h2><a href="${url}">${name} (${date})</a></h2>
                    <div>${description}</div>
                </li>
            `;
        });
    });
};
