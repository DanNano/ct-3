from flask import Flask, jsonify
from datetime import datetime, timedelta
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

def scrape_florida_meetings(start_date, end_date):
    base_url = 'https://www.myfloridahouse.gov/Sections/HouseSchedule/houseschedule.aspx?calendarListType=Interim&date='
    current_date = start_date
    all_meetings = []

    # Scrape meetings for future dates
    while current_date <= end_date:
        url = base_url + current_date.strftime('%m-%d-%Y')
        print(f"Scraping meetings for date: {current_date.strftime('%m-%d-%Y')}")

        try:
            # Send a GET request to the URL
            response = requests.get(url)

            if response.status_code == 200:
                # Creating BeautifulSoup object to parse the HTML content
                soup = BeautifulSoup(response.content, 'html.parser')

                # Find the container that holds the meeting information
                schedule_box = soup.find('section', class_='schedule-box')

                if schedule_box:
                    # Find all the meeting elements within the schedule box
                    meeting_elements = schedule_box.find_all('div', class_='row-striped')

                    # Extract the meeting details from each element
                    meetings = []
                    for element in meeting_elements:
                        title = element.find('h2', class_='scheduled-event-title').text.strip()
                        date = element.find('span', class_='schedule_ids').text.strip()

                        time_element = element.find('span', class_='schedule_ids').find_next('span', class_='schedule_ids')
                        time = time_element.text.strip() if time_element else "N/A"

                        meeting = {
                            'title': title,
                            'date': date,
                            'time': time
                        }
                        meetings.append(meeting)

                    all_meetings.extend(meetings)
                    print(f"Found {len(meetings)} meetings for date: {current_date.strftime('%m-%d-%Y')}")
                else:
                    print("No schedule box found for date: ", current_date.strftime('%m-%d-%Y'))
            else:
                print("Request failed with status code: ", response.status_code)
        except requests.exceptions.RequestException as e:
            print("An error occurred while making the request: ", e)

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