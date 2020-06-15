import React from 'react';

const CourseDetail = (props) => {
    const courseId = props.match.params.id;
    const course = ({
        id: courseId || Math.ceil(Math.random() * 10000),
        title: "Dummy Title For Some course & some long name for 3 lines more and more content is here",
        instructor: "Instructor Name, some long name here is trunctaed with magic",
        featured: true,
        enrolled: false,  /*If user enrolled */
        rating: 4.0,
        ratingCount: 250, /* Total Ratings */
        studentCount: 21550, /* Total students Who Enrolled this */
        lectureCount: 16, /* Total Lectures */
        language: "English",
        duration: 3, /* Hrs of duration */
        discount: 50, /* % off */
        description: "Python is the language for people wanting to start their careers as programmers, data analysts, machine learning specialists, or AI developers.",
        price: 200, //This is Discounted Amount
        updated: Date.now(),
    });

    return (
        <div>
            This is Course Detail Page for course : {courseId}
        </div>
    )
}

export default CourseDetail;
