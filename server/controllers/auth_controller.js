const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const db = req.app.get("db");
    const {username, password, email} = req.body;

    const checkedUser = await db.get_user([username]);
    if (checkedUser.length === 0) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await db.register_user([
            username,
            hashPassword,
            email
        ]);
        res.status(200).json(user);
    } else {
        res.status(409).json({error: "Username taken please try another"})
    }
};

const login = async (req, res) => {
    const db = req.app.get("db");
    const {username, password} = req.body;

    const checkedUser = await db.get_user([username]);
    if (checkedUser.length === 0) {
        res.status(401).json({error: "Wrong username or password"});
    }

    const isMatching = await bcrypt.compareSync(password, checkedUser[0].hash_password);
    if (isMatching) {
        req.session.user = {
            id: checkedUser[0].user_id,
            username: checkedUser[0].username
        };
        console.log(req.session.user)
        return res.json(req.session.user);
    }   else {
        return res.status(403).json({error: "Wrong username or password"});
    }
};

const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
};

module.exports = {
    register, 
    login, 
    logout
}