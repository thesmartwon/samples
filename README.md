# Samples

Permissively licensed  ogg samples.

## Converting to ogg / m4a

```sh
for i in *; do ffmpeg -i "$i" -c:a aac -b:a 128k "${i%.*}.m4a"; done
for i in *; do ffmpeg -i "$i" -c:a libopus -b:a 64k "${i%.*}.ogg"; done
```

