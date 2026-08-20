import { useParams } from "react-router-dom";

function Profile () {
    const { id } = useParams();

    <div>
        <h1>
            Page Coming Soon
        </h1>
    </div>
    console.log(id);
}

export default Profile;