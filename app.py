from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_city_code')
def get_city_code():
    city_name = request.args.get('city', '')  # Correctly access query parameter
    city_url = f"https://en.wikipedia.org/wiki/Alachua,_Florida"
    data = scrape_city_website(city_url)
    return jsonify(data)

def scrape_city_website(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')

            
            text_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'])
            all_text = ' '.join([element.get_text().strip() for element in text_elements if element.get_text().strip()])

            return {'content': all_text}
        else:
            return {'error': 'Failed to retrieve content, status code: {}'.format(response.status_code)}
    except Exception as e:
        return {'error': 'An error occurred: {}'.format(str(e))}



if __name__ == '__main__':
    app.run(debug=True)