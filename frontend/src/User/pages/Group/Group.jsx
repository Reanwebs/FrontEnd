import "./Group.css"
import CommunityHead from "../../components/Group/CommunityHead";
import CommunityFeed from "../../components/Group/CommunityFeed";
import ActiveCommunity from "../../components/Group/ActiveCommunity";
import RecentFeed from "../../components/Group/RecentConferences";
const Group =()=>{
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('communities'); 
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    return (
        <>
        <div className="h-screen">
         <div className="type-container justify-center ">
          <div className={`flex-item ${activeTab === 'communities' ? 'active' : ''} mx-12`}
                  onClick={() => {
                    handleTabClick('communities');
                  }}>
              <p>Communities</p>
          </div >

          <div className={`flex-item ${activeTab === 'create' ? 'active' : ''} mx-12`}
                  onClick={() => {
                    handleTabClick('create');
                  }}>
              <p>Create</p>
          </div>
            
         </div>
         <div className={`conference-body ${activeTab === 'communities' ? 'active' : ''}`}>
                {activeTab === 'communities' && <Groups/>}
              </div>
        
              <div className={`conference-body ${activeTab === 'create' ? 'active' : ''}`}>
                {activeTab === 'create' && <Create/>}
              </div>
        </div>
         
        </> 
    );
   
}

export default Group;