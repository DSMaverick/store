<!DOCTYPE html>
<html lang="en" xml:lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Store - Products</title>
    <link rel="stylesheet" type="text/css" href="static/styles.css" />
    <link rel="stylesheet" type="text/css" href="static/products.css" />
    <link rel="stylesheet" type="text/css" href="static/responsive.css" />
    <link rel="stylesheet" type="text/css" href="static/dropdown.css" />
  </head>
  <body>
    <header>
    <div class="h1-container">
        <h1>Store</h1>
      </div>
      <nav>
        <ul id="draggable-nav">
          <li class="draggable"><a href="register.html">Register</a></li>
          <li class="draggable"><a href="login.html">Login</a></li>
          <li class="draggable"><a href="home.html">Home</a></li>
          <li class="draggable"><a href="cart.html">Cart</a></li>
          <li class="draggable"><a href="products.php">Products</a></li>
        </ul>
      </nav>
      <button id="theme-toggle" class="theme-toggle"></button>

    </header>
    <main id="main-content">
      <h2>Our Products</h2>
      <div id="filter-dropdown" class="dropdown">
        <button class="dropbtn">Filter by Price</button>
        <div class="dropdown-content">
          <a href="#" onclick="filterByPrice('low')">Low to High</a>
          <a href="#" onclick="filterByPrice('high')">High to Low</a>
        </div>
      </div>
      <div class="product-container" id="product-container" style="margin-top: 20px">
        <?php
        $servername = "localhost";
        $username = "admin";
        $password = "";
        $dbname = "storedb";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Conexiune eșuată: " . $conn->connect_error);
        }

        $sql = "SELECT nume_produs, pret_produs, imagine_produs FROM products";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // Afisarea produselor
            while ($row = $result->fetch_assoc()) {
                echo "<div class='product-card'>";
                echo "<img class='product-image' src='" . $row["imagine_produs"] . "' alt='Product Image'>";
                echo "<h3 class='product-name'>" . $row["nume_produs"] . "</h3>";
                echo "<p class='product-price'>$" . $row["pret_produs"] . "</p>";
                echo "<class='add-to-cart' onclick='addToCart(\"" . $row["nume_produs"] . "\", " . $row["pret_produs"] . ")'/>";
                echo "</div>";
            }
        } else {
            echo "Nu există produse disponibile.";
        }

        $conn->close();
        ?>
      </table>
        <script src="javascript/products.js"></script>
        <script src="javascript/script.js"></script>
    </main>
    <footer>
      <p>&copy; 2023 My Store. All rights reserved.</p>
    </footer>
  </body>
</html>
