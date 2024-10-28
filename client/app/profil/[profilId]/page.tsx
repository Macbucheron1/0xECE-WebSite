
interface UserProfileProps {
    username: string;
}

export default function UserProfile({username}: UserProfileProps) {

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            <p className="text-lg text-gray-700 mb-2">
                Profile ID: Not available
            </p>
            <div className="bg-white p-6 rounded shadow mt-4">
                <h2 className="text-2xl font-bold mb-4">User Information</h2>
                <p className="text-lg text-gray-700">
                    Email: not available
                </p>
                <p className="text-lg text-gray-700">
                    Username: NathanDeprat
                </p>
            </div>
        </div>
    );
}