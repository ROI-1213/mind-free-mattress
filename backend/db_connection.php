<?php
/**
 * MINDFREE MATTRESS — Direct PostgreSQL Connection for mindfreemat.roiclients.co.in
 * Host: localhost | Port: 5432 | Database: mindf31 | User: mindf31
 */

function OpenCon()
{
    $dbhost = getenv('DB_HOST') ?: "localhost";
    $dbport = "5432";
    $dbuser = "mindf31";
    $dbpass = "IgLgwJQIIOqHvnjWSG42IPpXQ";
    $db     = "mindf31";

    // Primary PDO PostgreSQL Connection
    if (extension_loaded('pdo_pgsql')) {
        try {
            $dsn = "pgsql:host={$dbhost};port={$dbport};dbname={$db}";
            $conn = new PDO($dsn, $dbuser, $dbpass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
            return $conn;
        } catch (PDOException $e) {
            die("Connect failed: " . $e->getMessage());
        }
    }

    // Native pg_connect fallback
    if (function_exists('pg_connect')) {
        $connStr = "host={$dbhost} port={$dbport} dbname={$db} user={$dbuser} password={$dbpass}";
        $conn = pg_connect($connStr) or die("Connect failed: " . pg_last_error());
        return $conn;
    }

    die("Connect failed: PostgreSQL PHP extension (pdo_pgsql / pgsql) is required.");
}

function CloseCon(&$conn)
{
    if ($conn instanceof PDO) {
        $conn = null;
    } elseif (is_resource($conn) || (class_exists('PgSql\Connection') && $conn instanceof \PgSql\Connection)) {
        pg_close($conn);
    }
}
?>
