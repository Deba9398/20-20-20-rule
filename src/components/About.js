import React from 'react';
import './About.scss';

class About extends React.Component {
    render() {
        return (
            <div className="about row">
                <div className="col">
                    <h3>How to Use this Site</h3>
                    <p>Computer Vision Syndom (CVS) describes the symptoms associated with prolonged computer, phone, and other digital device use. Common symptoms are eyestrain, headaches, blurred vision, and dry eyes.</p>
                    <p>Periodically looking away from your screen to relax your eyes can help reduce the frequency of symptoms.</p>
                    <p>Simply press start and go back to doing what you were doing. You'll get a notification when it time to look away from your screen and another notification when the break is over.</p>
                </div>
                <div className="col">
                    <h3>Does this Actually Help?</h3>
                    <p>The <a href="https://www.aoa.org/documents/infographics/SYVM2016Infographics.pdf">American Optomietric Association</a>, <a href="https://opto.ca/health-library/the-20-20-20-rule">Canadian Association of Optometrists</a>, and <a href="https://www.aao.org/eye-health/tips-prevention/computer-usage">American Academy of Ophthalmology</a> all recommend using this method to reduce eye strain.</p>
                    <p><a href="https://www.nepjol.info/index.php/NEPJOPH/article/view/8707">A study</a> involving 795 students between the ages of 18 and 25 found that looking at far away objects in-between work was significantly (p=0.0008) associated with lower frequency of CVS symptoms. </p>
                </div>
            </div>
        );
    }
}

export default About;
