import { NextPage } from "next";
import AdminPage from "../../../components/template/AdminPage";

const AdminDashboard: NextPage = () => {
    return (
        <AdminPage pageName="Dashboard">
            <div className="flex flex-wrap mt-4">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                </div>
            </div>
        </AdminPage>
    )
}

export default AdminDashboard;