from flask import Flask, jsonify
from datetime import datetime, timedelta
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def scrape_florida_meetings(start_date, end_date):
    base_url = 'https://www.myfloridahouse.gov/Sections/HouseSchedule/houseschedule.aspx?calendarListType=Interim&date='
    current_date = start_date
    all_meetings = []

    while current_date <= end_date:
        url = base_url + current_date.strftime('%Y-%m-%d')
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            schedule_box = soup.find('section', class_='schedule-box')
            if schedule_box:
                meeting_elements = schedule_box.find_all('div', class_='row-striped')
                for element in meeting_elements:
                    title = element.find('h2', class_='scheduled-event-title').text.strip()
                    date = element.find('span', class_='schedule_ids').text.strip()
                    time_element = element.find('span', class_='schedule_ids').find_next('span')
                    time = time_element.text.strip() if time_element else "N/A"
                    meeting = {'title': title, 'date': date, 'time': time}
                    all_meetings.append(meeting)
        current_date += timedelta(days=1)

    return all_meetings

@app.route('/api/meetings')
def get_meetings():
    start_date = datetime.now() - timedelta(days=30)
    end_date = datetime.now() + timedelta(days=30)
    meetings = scrape_florida_meetings(start_date, end_date)
    return jsonify(meetings)

if __name__ == '__main__':
    app.run(debug=True)
