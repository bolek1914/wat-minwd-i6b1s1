import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URL;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static void searchWiki(String searchQuery) {
        String searchUrl = "https://pl.wiktionary.org/wiki/" + searchQuery;

        JSONObject jo = new JSONObject();
        JSONArray ar = new JSONArray();

        try {
            Document doc = Jsoup.connect(searchUrl).get();

            Elements dds = doc.select("dd");

            Element imageDiv = doc.selectFirst("div.thumbinner");

            Element image = imageDiv.selectFirst("img.thumbimage");
            String imagePath = image.attr("src");
            System.out.println(image.attr("src"));

            if(dds == null) {
                System.out.println("Nie ma");
            } else {
                boolean found = false;
                for (Element dd : dds) {
                    if(!found) {
                            Element span = dd.selectFirst("span.audiolink");

                            if(span == null) {
                                continue;
                            }
                            else if (span.selectFirst("a").text().equals("wymowa brytyjska") || span.selectFirst("a").text().equals("wymowa amerykańska")) {
                                found = true;
                            }

                    } else {
                        if(dd.text().equals("")) {
                            continue;
                        }
                        else if(dd.text().contains("(1.")) {
                            ar.put(dd.text());
                            System.out.println(dd.text());
                        } else {
                            break;
                        }
                    }
                }
            }

            jo.put("tlumaczenia", ar);

            URL url = new URL("https:"+imagePath);
            System.out.println(url);
            BufferedImage img = ImageIO.read(url);
            File file = new File("img/downloaded.jpg");
            ImageIO.write(img, "jpg", file);

            byte[] fileContent = FileUtils.readFileToByteArray(new File("img/downloaded.jpg"));
            String encodedString = Base64.getEncoder().encodeToString(fileContent);

            jo.put("image", encodedString);

            String filename = "jsonFiles/"+searchQuery +"_"+ System.currentTimeMillis();
            FileWriter fileWriter = new FileWriter(filename+".json");
            PrintWriter printWriter = new PrintWriter(fileWriter);
            jo.write(printWriter);

            printWriter.close();

            System.out.println(jo);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args){
        String word = "";
        while(1 == 1) {
            Scanner myObj = new Scanner(System.in);
            System.out.println("=============================");
            System.out.println("Podaj słowo angielskie: ");
            System.out.println("=============================");

            word = myObj.nextLine();

            if(word.equals("exit") || word.equals("Exit")) {
                break;
            } else {
                searchWiki(word);
            }
        }



    }
}
