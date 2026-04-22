<?php
  $categorieFile = __DIR__ . "/creazioni/categorie.json";
  $gameDirectory = "img/creazioni/giochi/";
  session_start();
  $password = 'Vigainsider'; 
  $accesso = false;

  if (isset($_SESSION['accesso']) && $_SESSION['accesso'] === true) {
    $accesso = true;
  }

  if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['pswd'])) {
    if ($_POST['pswd'] == $password) {
      $_SESSION['accesso'] = true;
      $accesso = true;
    } else {
      echo "<script>alert('Password errata!');</script>";
    }
  }

  if (isset($_POST['logout'])) {
    session_destroy();
    header("Location: /aggiorna_creazioni");
    exit();
  }

  // Caricamento categorie: usiamo JSON_OBJECT_AS_ARRAY per sicurezza
  $categorie = file_exists($categorieFile) ? json_decode(file_get_contents($categorieFile), true) : array();

  // --- FUNZIONI DI GESTIONE ---
  function salvaDati($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
  }

  function scansionaTutto($dir, $baseDir, $depth = 0, $prefix = "") {
    if ($depth > 5) return array();
    $risultati = array();
    if (!is_dir($dir)) return array();
    $items = array_diff(scandir($dir), array('.', '..'));

    foreach ($items as $item) {
      $path = $dir . $item;
      if (is_dir($path)) {
        if (file_exists($path . '/dati.json')) {
          $dati = json_decode(file_get_contents($path . '/dati.json'), true);
          $cartellaRelativa = str_replace($baseDir, "", $path);
          $risultati[] = array(
            'cartella' => $cartellaRelativa,
            'nome' => $dati['name'] ?? $item,
            'prefix_auto' => $prefix,
            'depth' => $depth
          );
        } else {
          $nuovoPrefix = ($prefix === "") ? $item : $prefix . " - " . $item;
          $risultati = array_merge($risultati, scansionaTutto($path . '/', $baseDir, $depth + 1, $nuovoPrefix));
        }
      }
    }
    return $risultati;
  }

  // --- LOGICA POST ---

  // SPOSTAMENTO CATEGORIE (ORDINE PERSONALIZZATO)
  if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['sposta_cat'])) {
    $cat = $_POST['categoria'];
    $direzione = $_POST['direzione']; // 'su' o 'giu'
    $keys = array_keys($categorie);
    $pos = array_search($cat, $keys);

    if ($direzione == 'su' && $pos > 0) {
        $tempKey = $keys[$pos - 1];
        $keys[$pos - 1] = $keys[$pos];
        $keys[$pos] = $tempKey;
    } elseif ($direzione == 'giu' && $pos < count($keys) - 1) {
        $tempKey = $keys[$pos + 1];
        $keys[$pos + 1] = $keys[$pos];
        $keys[$pos] = $tempKey;
    }

    $nuovoOrdine = array();
    foreach ($keys as $k) {
        $nuovoOrdine[$k] = $categorie[$k];
    }
    $categorie = $nuovoOrdine;
    salvaDati($categorieFile, $categorie);
    header("Location: /aggiorna_creazioni");
    exit();
  }

  // PULSANTE SCANSIONE: Ricostruisce tutto l'archivio
  if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['scansiona'])) {
    $nuovoArchivio = array(); 
    $tuttiIGiochiTrovati = scansionaTutto($gameDirectory, $gameDirectory);
    
    foreach ($tuttiIGiochiTrovati as $gioco) {
      if ($gioco['depth'] > 0 && !empty($gioco['prefix_auto'])) {
        $catName = $gioco['prefix_auto'];
        if (!isset($nuovoArchivio[$catName])) $nuovoArchivio[$catName] = array();
        $nuovoArchivio[$catName][] = array('cartella' => $gioco['cartella'], 'nome' => $gioco['nome']);
      }
    }
    
    $categorie = $nuovoArchivio;
    salvaDati($categorieFile, $categorie);
    header("Location: /aggiorna_creazioni");
    exit();
  }

  if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['aggiungi']) && isset($_POST['categoria'])) {
    $categoria = trim($_POST['categoria']);
    if (!empty($categoria) && !isset($categorie[$categoria])) {
      $categorie[$categoria] = array();
      salvaDati($categorieFile, $categorie);
    }
    header("Location: /aggiorna_creazioni");
    exit();
  }

  if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['rimuovi'])) {
    $categoria = $_POST['categoria'];
    if (isset($categorie[$categoria])) {
      unset($categorie[$categoria]);
      salvaDati($categorieFile, $categorie);
    }
    header("Location: /aggiorna_creazioni");
    exit();
  }

  if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['aggiungi_gioco'])) {
    $giochi_selezionati = $_POST['giochi'] ?? array();
    $categoria_selez_name = $_POST['categoria'];
    if (!empty($giochi_selezionati) && !empty($categoria_selez_name)) {
      foreach ($giochi_selezionati as $giocoCartella) {
        $check = array_column($categorie[$categoria_selez_name], 'cartella');
        if (!in_array($giocoCartella, $check)) {
          $dati = json_decode(file_get_contents($gameDirectory . $giocoCartella . '/dati.json'), true);
          $categorie[$categoria_selez_name][] = array('cartella' => $giocoCartella, 'nome' => $dati['name']);
        }
      }
      salvaDati($categorieFile, $categorie);
      header("Location: /aggiorna_creazioni");
      exit;
    }
  }

  if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['rimuovi_gioco'])) {
    $giochi_selezionati = $_POST['giochi'] ?? array();
    $categoria_selez_name = $_POST['categoria'];
    if (!empty($giochi_selezionati) && !empty($categoria_selez_name)) {
      foreach ($giochi_selezionati as $giocoJson) {
        $giocoDecodificato = json_decode($giocoJson, true);
        $categorie[$categoria_selez_name] = array_values(array_filter($categorie[$categoria_selez_name], function($g) use ($giocoDecodificato) {
          return $g['cartella'] != $giocoDecodificato['cartella'];
        }));
      }
      salvaDati($categorieFile, $categorie);
      header("Location: /aggiorna_creazioni");
      exit;
    }
  }

  // --- LOGICA DI VISUALIZZAZIONE TABELLA ---
  $giochiTabella = array();
  $giochi_senza_categoria = array();
  $scansioneFisica = scansionaTutto($gameDirectory, $gameDirectory);

  foreach ($scansioneFisica as $giocoFisico) {
    $categoriaTrovata = "";
    foreach ($categorie as $nomeCat => $listaGiochi) {
      foreach ($listaGiochi as $gJson) {
        if ($gJson['cartella'] == $giocoFisico['cartella']) {
          $categoriaTrovata = $nomeCat;
          break 2;
        }
      }
    }
    
    $info = array(
      'nome' => $giocoFisico['nome'],
      'cartella' => $giocoFisico['cartella'],
      'categoria' => $categoriaTrovata
    );
    
    $giochiTabella[] = $info;
    if (empty($categoriaTrovata)) {
      $giochi_senza_categoria[] = $info;
    }
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Creazioni - Gestione categorie</title>
    <link rel="icon" href="logoViga.png" type="image/png">
    <style>
      * { font-family: Arial, Helvetica, sans-serif; }
      body {
        font-family: Arial, sans-serif;
        width: 75%;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        h1, h2, h3 { text-align: center; }
        input[type="text"], input[type="checkbox"] {
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 10px;
        }
        input[type="checkbox"] { width: 15px; height: 15px; }
        button[type="submit"] {
          padding: 5px 10px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button[type="submit"]:hover { background-color: #45a049; }
        select, option {
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 10px;
        }
        table {
          width: 62.5%;
          border-collapse: collapse;
          margin: 20px 0;
          margin: auto;
        }
        th, td {
          padding: 10px;
          border: 1px solid #ccc;
          text-align: center;
        }
        th { background-color: #f2f2f2; }
        #categorie form {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .btn-order {
          background-color: #2196F3 !important;
          padding: 2px 8px !important;
          margin: 0 2px;
        }
      }
    </style>
  </head>
  <body>
    <?php if (!$accesso): ?>
      <form method="POST" action="">
        <label for="pswd">Password:</label>
        <input type="password" name="pswd" id="pswd" required>
        <input type="submit" value="Accedi">
      </form>
    <?php else: ?>
      <div id="categorie">
        <h2>Categorie</h2>
        <form method="POST" action="">
          <input type="hidden" name="logout" value="1">
          <button type="submit" style="background-color: #f44336;">Logout</button>
        </form>

        <form action="" method="post">
          <button type="submit" name="scansiona" style="background-color: #2196F3; margin-bottom: 20px;">Sincronizza Archivio (Ricostruisci tutto)</button>
        </form>

        <form action="" method="post">
          <label for="categoria">Aggiungi categoria:</label>
          <input type="text" id="categoria" name="categoria" required>
          <button type="submit" name="aggiungi">Aggiungi</button>
        </form>
        <form action="" method="post">
          <label for="categoria_del">Rimuovi categoria:</label>
          <select id="categoria_del" name="categoria">
            <?php foreach ($categorie as $categoria => $giochiC) : ?>
              <option value="<?php echo $categoria; ?>"><?php echo $categoria; ?></option>
            <?php endforeach; ?>
          </select>
          <button type="submit" name="rimuovi">Rimuovi</button>
        </form>
        <h3>Elenco categorie</h3>
        <table>
          <tr><th>Ordine</th><th>Nome categoria</th><th>Numero elementi</th></tr>
          <?php 
          $keys = array_keys($categorie);
          foreach ($keys as $index => $categoria) : 
            $giochiC = $categorie[$categoria];
          ?>
            <tr>
              <td>
                <form method="POST" style="display:inline; margin:0; padding:0;">
                    <input type="hidden" name="categoria" value="<?php echo $categoria; ?>">
                    <input type="hidden" name="sposta_cat" value="1">
                    <?php if ($index > 0): ?>
                        <button type="submit" name="direzione" value="su" class="btn-order">⬆️</button>
                    <?php endif; ?>
                    <?php if ($index < count($keys) - 1): ?>
                        <button type="submit" name="direzione" value="giu" class="btn-order">⬇️</button>
                    <?php endif; ?>
                </form>
              </td>
              <td><?php echo $categoria; ?></td>
              <td><?php echo count($giochiC); ?></td>
            </tr>
          <?php endforeach; ?>
        </table>
      </div>
      <hr>
      
      <div id="giochi">
        <h2>Giochi Rilevati</h2>
        <table>
          <tr><th>Nome del gioco</th><th>Cartella</th><th>Categoria</th></tr>
          <?php foreach ($giochiTabella as $gioco) : 
            $partiCartella = explode('/', rtrim($gioco['cartella'], '/'));
            $nomeCartellaSemplice = end($partiCartella);
          ?>
            <tr>
              <td><?php echo $gioco['nome']; ?></td>
              <td><code><?php echo $nomeCartellaSemplice; ?></code></td>
              <td><?php echo $gioco['categoria']; ?></td>
            </tr>
          <?php endforeach; ?>
        </table>
      </div>
      
      <hr>
      <div id="rimuovi_gioco" style="width: 50%; margin: auto;">
        <h2>Giochi della categoria selezionata</h2>
        <form action="" method="POST">
          <label for="categoria_view">Seleziona categoria:</label>
          <select id="categoria_view" name="categoria_view">
            <?php foreach ($categorie as $categoria => $giochiC) : ?>
              <option value="<?php echo $categoria; ?>" <?php if(isset($_POST['categoria_view']) && $_POST['categoria_view'] == $categoria) echo 'selected'; ?>><?php echo $categoria; ?></option>
            <?php endforeach; ?>
          </select>
          <button type="submit">Visualizza giochi</button>
        </form>
        <?php if (isset($_POST['categoria_view']) && isset($categorie[$_POST['categoria_view']])) : ?>
          <h3>Giochi della categoria "<?php echo $_POST['categoria_view']; ?>"</h3>
          <form action="" method="POST">
            <?php foreach ($categorie[$_POST['categoria_view']] as $gioco) : ?>
              <div class="form-check">
                <input type="checkbox" name="giochi[]" value='<?php echo json_encode($gioco); ?>'>
                <label><?php echo $gioco['nome']; ?> (<?php echo $gioco['cartella']; ?>)</label>
              </div>
            <?php endforeach; ?>
            <input type="hidden" name="categoria" value="<?php echo $_POST['categoria_view']; ?>">
            <button type="submit" name="rimuovi_gioco" style="background-color: #f44336; margin-top: 10px;">Rimuovi selezionati</button>
          </form>
        <?php endif; ?>
      </div>
      <hr>
      <div id="aggiungi_gioco" style="width: 50%; margin: auto;">
        <h2>Aggiungi gioco manuale a categoria</h2>
        <form action="" method="POST">
          <div style="max-height: 200px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
            <?php foreach ($giochi_senza_categoria as $gioco) : ?>
              <div class="form-check">
                <input type="checkbox" name="giochi[]" value="<?php echo $gioco["cartella"]; ?>">
                <label><?php echo $gioco['nome']; ?> <small style="color:#666;">(<?php echo $gioco['cartella']; ?>)</small></label>
              </div>
            <?php endforeach; ?>
          </div>
          <br>
          <label for="categoria_target">Seleziona categoria:</label>
          <select id="categoria_target" name="categoria">
            <?php foreach ($categorie as $categoria => $giochiC) : ?>
              <option value="<?php echo $categoria; ?>"><?php echo $categoria; ?></option>
            <?php endforeach; ?>
          </select>
          <button type="submit" name="aggiungi_gioco">Aggiungi</button>
        </form>
      </div>
    <?php endif; ?>
  </body>
</html>