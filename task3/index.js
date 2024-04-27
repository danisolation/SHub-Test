const axios = require('axios');

async function solve() {
    const input = await axios.get('https://share.shub.edu.vn/api/intern-test/input');
    const { data, query, token } = input.data;

    const results = query.map(q => {
        const { type, range: [l, r] } = q;
        let result = 0;
        if (type === '1') {
            for (let i = l; i <= r; i++) {
                result += data[i];
            }
        } else {
            for (let i = l; i <= r; i++) {
                result += (i % 2 === 0 ? 1 : -1) * data[i];
            }
        }
        return result;
    });

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    await axios.post('https://share.shub.edu.vn/api/intern-test/output', results, config);

    
}

solve()
    .then(console.log('Success'))
    .catch(console.error);
