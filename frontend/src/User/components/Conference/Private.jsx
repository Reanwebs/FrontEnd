import "./Conference.css"

import{useState ,useRef} from 'react';
import { useStartPrivateConferenceMutation } from "../../slices/api_slices/usersConferenceApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const Private = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    interest: '',
    chat: false,
    participantlimit: 0,
  });

  const [startPrivateConference] = useStartPrivateConferenceMutation();
  const navigate = useNavigate()



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };
  const handleSubmit =async (e) => {
    try {
      e.preventDefault();
      const data = {
        title:formData.title,
        description:formData.description,
        interest:formData.interest,
        chat:formData.chat,
        participantlimit:formData.participantlimit,
      }
      const res = await startPrivateConference(data).unwrap();
      console.log(res,"66666666666666");
      navigate(`/media-container/${res.conferenceID}`)
      
    } catch (error) {
      console.log(error);
      
    }
   
  };

  

  return (
    <div className="flex flex-col items-center m-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Interest:</label>
          <input
            type="text"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="chat"
              checked={formData.chat}
              onChange={handleChange}
            />{' '}
            Enable Chat
          </label>
        </div>
        <div>
          <label>Participant Limit:</label>
          <input
            type="number"
            name="participantlimit"
            value={formData.participantlimit}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button  type="submit">Start Private Conference</button>
        </div>
      </form>
    </div>
  );
};

export default Private;
