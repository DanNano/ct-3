import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta


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
                # Creating  BeautifulSoup object to parse the HTML content
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

                        time_element = element.find('span', class_='schedule_ids').find_next('span',
                                                                                             class_='schedule_ids')
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
                    print(f"No schedule box found for date: {current_date.strftime('%m-%d-%Y')}")
            else:
                print(f"Request failed with status code: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred while making the request: {e}")

        current_date += timedelta(days=1)

    # Scrape meetings for past dates up to two months ago
    past_date = start_date - timedelta(days=1)
    two_months_ago = start_date - timedelta(days=60)

    while past_date >= two_months_ago:
        url = base_url + past_date.strftime('%m-%d-%Y')
        print(f"Scraping meetings for date: {past_date.strftime('%m-%d-%Y')}")

        try:
            # Send a GET request to the URL
            response = requests.get(url)

            if response.status_code == 200:
                # Create a BeautifulSoup object to parse the HTML content
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

                        time_element = element.find('span', class_='schedule_ids').find_next('span',
                                                                                             class_='schedule_ids')
                        time = time_element.text.strip() if time_element else "N/A"

                        meeting = {
                            'title': title,
                            'date': date,
                            'time': time
                        }
                        meetings.append(meeting)

                    all_meetings.extend(meetings)
                    print(f"Found {len(meetings)} meetings for date: {past_date.strftime('%m-%d-%Y')}")
                else:
                    print(f"No schedule box found for date: {past_date.strftime('%m-%d-%Y')}")
            else:
                print(f"Request failed with status code: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred while making the request: {e}")

        past_date -= timedelta(days=1)

    return all_meetings

# Today's date
today = datetime.now()

# Set start and end dates to scan one month ahead and one month before
start_date = today - timedelta(days=30)
end_date = today + timedelta(days=30)

meetings = scrape_florida_meetings(start_date, end_date)

# Handle the scraped meetings
for meeting in meetings:
    print(f"Title: {meeting['title']}")
    print(f"Date: {meeting['date']}")
    print(f"Time: {meeting['time']}")
    print('---')