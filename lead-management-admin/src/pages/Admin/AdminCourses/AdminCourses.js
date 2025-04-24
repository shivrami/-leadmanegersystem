import React, { useEffect, useState } from "react";
import Navbar from "../../../include/Navbar";

import Sidebar2 from "../../../include/Sidebar2";
import Footer from "../../../include/Footer";
import Sidebar from "../../Admin/Sidebar/Sidebar";

const AdminCourses = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [fee, setFee] = useState("");
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/courses");
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle adding/updating a course
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName.trim() || !courseDescription.trim() || !duration || !fee) {
      setError("All fields are required");
      return;
    }

    const newCourse = {
      courseName,
      courseDescription,
      duration: parseInt(duration),
      fee: parseInt(fee),
    };

    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        editingCourse
          ? `http://localhost:8080/api/courses/${editingCourse.id}`
          : "http://localhost:8080/api/courses",
        {
          method: editingCourse ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCourse),
        }
      );

      if (!response.ok) throw new Error("Failed to save course");

      setSuccess(editingCourse ? "Course updated successfully" : "Course added successfully");
      setCourseName("");
      setCourseDescription("");
      setDuration("");
      setFee("");
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete course");

      setSuccess("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Navbar />
          <div className="container">
            <div className="page-inner">
              <div className="page-header">
                <h3 className="fw-bold mb-3">Manage Courses</h3>
              </div>

              <div className="card">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title">Courses</h4>
                  <button
                    className="btn btn-primary btn-round ms-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#addCourseModal"
                  >
                    <i className="fa fa-plus" /> Add Course
                  </button>
                </div>

                <div className="card-body">
                  <div className="modal fade" id="addCourseModal" tabIndex={-1}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">
                            {editingCourse ? "Edit Course" : "New Course"}
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                          />
                        </div>
                        <div className="modal-body">
                          <form onSubmit={handleSubmit}>
                            <div className="form-group">
                              <label>Course Name</label>
                              <input
                                type="text"
                                className="form-control"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Course Description</label>
                              <input
                                type="text"
                                className="form-control"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Duration (weeks)</label>
                              <input
                                type="number"
                                className="form-control"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Fee</label>
                              <input
                                type="number"
                                className="form-control"
                                value={fee}
                                onChange={(e) => setFee(e.target.value)}
                              />
                            </div>
                            {error && <small className="text-danger">{error}</small>}
                            {success && <small className="text-success">{success}</small>}
                            <div className="modal-footer">
                              <button type="submit" className="btn btn-success">
                                {editingCourse ? "Update" : "Add"}
                              </button>
                              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                Close
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Course Name</th>
                          <th>Description</th>
                          <th>Duration</th>
                          <th>Fee</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.length > 0 ? (
                          courses.map((course) => (
                            <tr key={course.id}>
                              <td>{course.courseName}</td>
                              <td>{course.courseDescription}</td>
                              <td>{course.duration} weeks</td>
                              <td>${course.fee}</td>
                              <td>
                                <button
                                  className="btn  btn-link btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#addCourseModal"
                                  onClick={() => {
                                    setEditingCourse(course);
                                    setCourseName(course.courseName);
                                    setCourseDescription(course.courseDescription);
                                    setDuration(course.duration);
                                    setFee(course.fee);
                                  }}
                                >
                                  <i className="fa fa-edit" />
                                </button>
                                &nbsp;&nbsp;
                                <button
                                  className="btn  btn-link btn-danger"
                                  onClick={() => handleDelete(course.id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">No Courses Found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          </div>
        </div>
        <Sidebar2 />
      </div>
    </>
  );
};

export default AdminCourses;
