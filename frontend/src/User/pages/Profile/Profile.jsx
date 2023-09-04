

const Profile = ()=>{
    return (
     <section className="h-screen ml-12 pl-5 pr-5 ">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-max mt-12">
            <div className="md:flex ">
                <div className="md:shrink-0">
                <img className="h-48 w-full object-cover md:h-full md:w-48" src="/img/building.jpg" alt="Modern building architecture"/>
                </div>
                <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
                <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Profile