import { withSSRContext } from "aws-amplify";
import { GetServerSideProps, NextPage } from "next";
import { useAdminSessionCheck } from "../../../components/lib/auth/admin-auth";
import AdminPage from "../../../components/template/AdminPage";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    try {
        const {Auth} = withSSRContext({req});
        const user = await Auth.currentSession();
        console.log(user)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if (!useAdminSessionCheck(user, true)) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/admin/portal/login"
                },
                props: {}
            }
        }
    }catch(err){
        console.log(err)
    }

    return {
        props: {}
    }
}


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