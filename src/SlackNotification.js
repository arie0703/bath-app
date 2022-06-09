import axios from 'axios';

const notification = (meal_name, image_url) => {


    const data = {
        "text": "料理が新しく投稿されました!",
        "attachments": [{
            "fields": [
                {
                    "title": meal_name,
                    "value": meal_name,
                }],
            "image_url": image_url
        }]
    }

    axios.post(
        process.env.REACT_APP_SLACK_URL,
        JSON.stringify(data),
        // corsエラー回避
        {
            withCredentials: false,
            transformRequest: [(data, headers) => {
            delete headers.post["Content-Type"]
            return data
            }]
        }
    )
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    });
}

export default notification;
