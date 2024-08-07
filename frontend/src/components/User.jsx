import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import blogService from "../services/blogService"
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";
import { setUsers } from "../redux/reducers/usersSlice";
import { Table } from "react-bootstrap";

const User = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.find((user) => user.id === id))

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const users = await blogService.fetchUsers();
            dispatch(setUsers(users));
          } catch (error) {
            console.error("Failed to fetch particular user", error);
          }
        };
        fetchUsers();
      }, [dispatch]);
    

    if (!user) {
        return null
    }

    return (
        <div className="container mt-4">
      <h3>Blogs written by {user.name}:</h3>
      {user.blogs.length < 1 ? (
        <p>User has not added any blogs yet!</p>
      ) : (
        <Table borderless responsive hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Likes</th>
            </tr>
          </thead>
          <tbody>
            {user.blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                <Link to={`/blogs/${blog.id}`} className='custom_link'>
                    {blog.title}
                </Link>
                </td>
                <td>
                  {blog.likes}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    )
}

export default User