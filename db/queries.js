const pool = require("./pool");

async function insertUser(
    firstName,
    lastName,
    username,
    password
) {
    const userInsertQuery = `
        INSERT INTO users (firstname, lastname, username, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `;

    const userValues = [
        firstName,
        lastName,
        username,
        password
    ];

    try {
        const result = await pool.query(userInsertQuery, userValues);
        const userId = result.rows[0].id;
        console.log('User inserted successfully with ID:', userId);

        return userId;
    } catch(err) {
        console.error('Error inserting user:', err.message);
        throw new Error(`Error inserting user: ${err.message}`);
    }
}

async function updateMembership(username, newMembership) {
    const upgradeMembershipQuery = `
        UPDATE users
        SET membership = $1
        WHERE LOWER(username) = LOWER($2);
    `;

    try {
        await pool.query(upgradeMembershipQuery, [newMembership, username]);
        console.log(`Membership upgraded to ${newMembership} for user: ${username}`);
    } catch (err) {
        console.error('Error updating membership:', err.message);
        throw new Error(`Error updating membership: ${err.message}`);
    }
}

module.exports = {
    insertUser,
    updateMembership
}



