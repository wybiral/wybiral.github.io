from html import escape
import requests

def parse_date(proj):
    created = escape(proj['created_at'][:4])
    pushed = escape(proj['pushed_at'][:4])
    if created == pushed:
        return created
    return created + '-' + pushed

url = 'https://api.github.com/users/wybiral/repos?sort=created&per_page=100'
item = '<li><h2><a href="{url}">{name} ({date})</a></h2><div>{desc}</div></li>'
template = open('index.template.html', 'r').read()
output = open('index.html', 'w')
projects = ''
for x in requests.get(url).json():
    if not x['fork'] and x['description']:
        url = escape(x['html_url'])
        name = escape(x['name'])
        date = parse_date(x)
        desc = escape(x['description'])
        projects += item.format(url=url, name=name, date=date, desc=desc)
output.write(template.format(projects=projects))
output.close()
