const config = require('./db-config');
const sql = require('mssql');

// Funcion Async: Asincrona que devuelve un objeto
async function getCategoria() {
    
    try {
        
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("SELECT * FROM d_test_categorias");
        return categorias.recordsets;

    } catch (error) {
        console.log(error);
    }

}

async function getCategoriaPorId(id) {
    
    try {
        
        let pool = await sql.connect(config);

        let categorias = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * FROM d_test_categorias WHERE id_categoria = @input_parameter");

        return categorias.recordsets;

    } catch (error) {
        console.log(error);
    }

}

async function insertCategoria(categoria) {
    
    try {
        
        let pool = await sql.connect(config);

        let insertCategoria = await pool.request()
            .input('id_categoria', sql.Int, categoria.id_categoria)
            .input('nombre_categoria', sql.VarChar, categoria.nombre_categoria)
            .input('obs_categoria', sql.VarChar, categoria.obs_categoria)
            .execute('SP_Categorias');

        return insertCategoria.recordsets;

    } catch (error) {
        console.log(error);
    }

}

async function updateCategoria(categoria) {
    
    try {
        
        let pool = await sql.connect(config);

        let updateCategoria = await pool.request()
            .input('id_categoria', sql.Int, categoria.id_categoria)
            .input('nombre_categoria', sql.VarChar, categoria.nombre_categoria)
            .input('obs_categoria', sql.VarChar, categoria.obs_categoria)
            .execute('Update_Categorias');

        return updateCategoria.recordsets;

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getCategoria, getCategoriaPorId, insertCategoria, updateCategoria
}