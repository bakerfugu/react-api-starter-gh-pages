import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

export default function CharacterCard(props) {
  // Each card is initialized as a Disney character until card button is pressed.
  const [catImg, setCatImg] = useState(props.image);
  const [catBreed, setCatBreed] = useState(props.characterName);
  const [description, setDescription] = useState(props.descriptionArray);

  async function getCat() {
    // Get a random cat image
    // the "has_breeds=1" is important for the second part
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?has_breeds=1",
      requestOptions
    );
    const data = await response.json();
    // get the first cat in the response data array
    const catData = data[0];

    // Save URL of cat image
    setCatImg(catData.url);

    // Use the cat's ID to make a new request for cat info
    const catId = catData.id;
    const infoResponse = await fetch(
      `https://api.thecatapi.com/v1/images/${catId}`,
      requestOptions
    );
    const catInfo = await infoResponse.json();
    setCatBreed(catInfo.breeds[0].name);

    // split the string into an array so we make bullet points later
    const temperamentList = catInfo.breeds[0].temperament.split(", ");
    setDescription(temperamentList);
  }

  return (
    <Card>
      <CardMedia component="img" height="350px" image={catImg} />
      <CardHeader
        title={catBreed}
        titleTypographyProps={{ align: "center" }}
        sx={{ mt: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <ul>
          {description.map((sentence) => (
            <Typography component="li" key={sentence}>
              {sentence}
            </Typography>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ px: 6, mx: "auto" }}
          onClick={() => {
            getCat();
          }}
        >
          GET CAT
        </Button>
      </CardActions>
    </Card>
  );
}
