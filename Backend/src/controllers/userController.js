const User = require('../models/user.model');
const Application = require('../models/application.model');

// @desc    Update user profile (Onboarding 'Blueprint')
// @route   PATCH /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Support both flat and nested profile structures
            const profileData = req.body.profile || req.body;
            
            user.profile.name = profileData.name || user.profile.name;
            user.profile.avatar = profileData.avatar || user.profile.avatar;
            user.profile.currentDegree = profileData.currentDegree || user.profile.currentDegree;
            user.profile.targetDestinations = profileData.targetDestinations || user.profile.targetDestinations;
            user.profile.annualBudget = profileData.annualBudget != null ? profileData.annualBudget : user.profile.annualBudget;
            
            // Handle academic standing updates
            if (profileData.academicStanding) {
                user.profile.academicStanding = {
                    ...user.profile.academicStanding,
                    ...profileData.academicStanding
                };
            } else if (profileData.gpa != null) {
                // Handle flat GPA update
                user.profile.academicStanding = {
                    ...user.profile.academicStanding,
                    gpa: Number(profileData.gpa)
                };
            }

            const updatedUser = await user.save();
            updatedUser.message = 'User profile updated successfully';

            res.json({
                _id: updatedUser._id,
                email: updatedUser.email,
                profile: updatedUser.profile
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get current user data (For dashboard initialization)
// @route   GET /api/users/me
// @access  Private

const getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User object is missing" });
        }

        // Fetch the latest application to determine progress
        const latestApplication = await Application.findOne({ userId: req.user._id })
            .sort({ updatedAt: -1 });

        res.json({ 
            user: req.user,
            applicationStatus: latestApplication ? latestApplication.status : 'Discovery' 
        }); 
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Construct public URL
        const protocol = req.protocol;
        const host = req.get('host');
        const avatarUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
        user.profile.avatar = avatarUrl;
        await user.save();

        res.json({
            message: 'Avatar uploaded successfully',
            avatar: avatarUrl
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { updateUserProfile, getUserProfile, uploadAvatar };