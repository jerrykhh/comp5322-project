import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useAdminSessionCheck } from "../../../components/lib/auth/admin-auth";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    try {
        const {Auth} = withSSRContext({req});
        const user = await Auth.currentSession();
        console.log(user)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if (useAdminSessionCheck(user, true)) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/admin/portal/adoptions"
                },
                props: {}
            }
        }
    }catch(err){
        console.log(err)
    }

    return {
        redirect: {
            permanent: false,
            destination: "/admin/portal/login"
        },
    }
}

const AdminIndexPage = () => {}

export default AdminIndexPage;