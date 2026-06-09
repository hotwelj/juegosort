const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { token, usuario } = JSON.parse(event.body);
    if (token !== "ort-piratas-xK92mNq7pL3wZ" || !usuario) {
      return { statusCode: 401, body: JSON.stringify({ ok: false }) };
    }

    const store = getStore("favoritos");
    const data = await store.get(usuario, { type: "json" });
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, favs: data || [] }),
    };
  } catch {
    return { statusCode: 200, body: JSON.stringify({ ok: true, favs: [] }) };
  }
};
