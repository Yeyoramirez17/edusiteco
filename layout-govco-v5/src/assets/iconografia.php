<?php
$folder_path = 'icons'; 
$num_files = glob($folder_path . "*.{JPG,jpeg,gif,png,bmp}", GLOB_BRACE);
$folder = opendir($folder_path); 
if ($num_files > 0) {
    while(false !== ($file = readdir($folder)))  {
        $file_path = $folder_path.$file;
        $extension = strtolower(pathinfo($file ,PATHINFO_EXTENSION));
        if ($extension=='jpg' || $extension =='png' || $extension == 'gif' || $extension == 'bmp') {
            ?>
            <img class="tfoto" src="<?php echo $file_path; ?>" alt="Imagen de ejemplo" title="Imagen de ejemplo">
            <?php
        }
    }
}
closedir($folder);

?>